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
  ) {
    Logger.log('received bookings and profile', bookings, userData.profile);
    Logger.log(userData.user.birthdate);
    let yearsOld;

    if (userData.user.birthdate) {
      yearsOld = this.calculateAge(new Date(userData.user.birthdate));
    }

    const bookingsWithRating = bookings.map(booking => {
      let rating = 0;

      if (yearsOld) {
        const ageIsIncompatible = booking.age >= 18 && yearsOld < 18;

        const ageCompatibility = this.calculateAgeCompatibility(yearsOld, booking.age);

        Logger.log('age compatibility', ageCompatibility);

        rating += ageIsIncompatible ? 0 : ageCompatibility;
      }

      Logger.log('rating', rating);

      const languageCompatibility = userData.profile.languages?.some(lang =>
        booking.languages.includes(lang),
      );

      Logger.log('lanuage compatibility', languageCompatibility);

      rating += Number(!!languageCompatibility);

      const descriptionCompatibility = this.calculateTextCompatibility(
        userData.profile.description,
        booking.notes,
      );

      rating += descriptionCompatibility;

      return {
        rating,
        ...booking,
      };
    });

    return bookingsWithRating.sort((bookingA, bookingB) => bookingB.rating - bookingA.rating);
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
    const compatibility = similarity(textA, textB);

    return compatibility;
  }
}
