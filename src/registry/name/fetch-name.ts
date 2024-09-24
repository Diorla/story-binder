export default async function fetchName(
  gender: "male" | "female",
  ethnicity: string
): Promise<{ names: string[] }> {
  const g = gender[0];
  const response = await fetch(
    `https://www.behindthename.com/api/random.json?usage=${ethnicity}&gender=${g}&number=6&key=ad465161762`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch name");
  }
  const data = await response.json();
  return data;
}
