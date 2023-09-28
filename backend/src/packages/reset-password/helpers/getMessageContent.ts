export const getMessageContent = async (id: number, token: string): Promise<string> => {
  return `<div >
    <p>Follow the link below to set new password<p>
    <a href="${process.env.RESET_PASSWORD_URL}?id=${id}&token=${token}">Reset password</a>
  </div>`;
};
