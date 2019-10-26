export default function parseInput(text) {
  const match = text.match(/([\d]*):*([\d]*)/);
  const minutes = match[2] ? parseInt(match[1], 10) : 0;
  const seconds = match[2] ? parseInt(match[2], 10) : parseInt(match[1], 10);

  return ((minutes * 60) + seconds) * 1000;
}
