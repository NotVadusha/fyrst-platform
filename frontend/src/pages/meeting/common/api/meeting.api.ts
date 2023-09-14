import { AUTH_TOKEN } from '../constants/constants';

export const createMeeting = async () => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const body = await res.json();

  const { roomId }: { roomId: string } = body;
  return roomId;
};

//TODO: Add redux toolkit query
