export function roleToText(roleLabel: string) {
  const splitted = roleLabel.split('_');

  if (splitted.length === 1) {
    return splitted[0][0] + splitted[0].slice(1).toLocaleLowerCase();
  }

  return `${splitted[0][0] + splitted[0].slice(1).toLocaleLowerCase()} ${
    splitted[1][0] + splitted[1].slice(1).toLocaleLowerCase()
  }`;
}
