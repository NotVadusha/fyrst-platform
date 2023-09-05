import { Injectable, Logger } from '@nestjs/common';
import * as similarity from 'similarity';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../user/entities/user.entity';
import { UserProfile } from '../user-profile/entities/user-profile.entity';

@Injectable()
export class RecommendationService {
  async makeBookingRecommendationRankingByProfile(
    bookings: Booking[],
    userData: { user: User; profile: UserProfile },
    currentPage: number,
  ) {
    let yearsOld;

    if (userData.user.birthdate) {
      yearsOld = this.calculateAge(new Date(userData.user.birthdate));
    }

    const bookingsWithRating = bookings.map(booking => {
      let rating = 0;

      if (yearsOld) {
        const ageIsIncompatible = booking.age >= 18 && yearsOld < 18;

        const ageCompatibility = this.calculateAgeCompatibility(yearsOld, booking.age);

        rating += ageIsIncompatible ? 0 : ageCompatibility;
      }

      const languageCompatibility = userData.profile.languages?.some(lang =>
        booking.languages.includes(lang),
      );

      rating += Number(!!languageCompatibility);

      const descriptionCompatibility = this.calculateTextCompatibility(
        userData.profile.description || '',
        booking.notes || '',
      );

      const educationCompatibility = this.calculateTextCompatibility(
        userData.profile.education || '',
        booking.education || '',
      );

      rating += descriptionCompatibility;
      rating += educationCompatibility;

      if (booking.sex) rating += Number(booking.sex === userData.profile.sex);

      return {
        rating,
        ...booking.dataValues,
      };
    });

    const take = 6;
    const skip = (currentPage - 1) * take;

    return bookingsWithRating
      .sort((bookingA, bookingB) => bookingB.rating - bookingA.rating)
      .splice(skip, take);
  }

  calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  calculateAgeCompatibility(ageA: number, ageB: number): number {
    const maxAgeDifference = 10;
    const ageDifference = Math.abs(ageA - ageB);
    const compatibility = 1 - ageDifference / maxAgeDifference;

    return Math.max(0, Math.min(1, compatibility));
  }

  calculateTextCompatibility(textA: string, textB: string): number {
    if (!textA || !textB) return 0;
    const compatibility = similarity(textA, textB);

    return compatibility;
  }
}
