export const config = {
  runtime: "edge",
};

export default async function GET(request) {
  return new Response(JSON.stringify({ message: "Hello from Edge!" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
