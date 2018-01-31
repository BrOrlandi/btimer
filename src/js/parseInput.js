export default function parseInput(text) {
  const match = text.match(/([\d]*):*([\d]*)/);
  const minutes = match[2] ? parseInt(match[1]) : 0;
  const seconds = match[2] ? parseInt(match[2]) : parseInt(match[1]);

  return ((minutes * 60) + seconds) * 1000;
}
