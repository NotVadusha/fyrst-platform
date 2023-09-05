export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlNWRjODVmOS0wM2NmLTRiYTgtYjI3MC00YTcxZGM2ODU0ZmMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzU2NTc0MCwiZXhwIjoxNjk0MTcwNTQwfQ.wX-00Ftx3xK3MUnNi94qLJ58OHKekCbTTn-wR3Z99-Q';

export const createMeeting = async ({ token }: { token: string }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const { roomId }: { roomId: string } = await res.json();
  return roomId;
};

//TODO: Add redux toolkit query
