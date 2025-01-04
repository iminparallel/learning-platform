"use client";
import { useRouter, useSearchParams } from "next/navigation";
import ClaimMileStone from "../../components/claimMilestone";

export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const total = searchParams.get("total");
  const project = searchParams.get("project");
  const assignment = searchParams.get("assignment");
  const MileStones = searchParams.get("milestones");
  let claimable;
  if (Number(MileStones) < Number(assignment)) {
    claimable = true;
  }

  console.log(score, total);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>Project: {project}</p>
      <p>Assignment: {assignment}</p>
      <br />
      <h1>Test Completed!</h1>
      <p>
        Your Score: {score} / {total}
      </p>
      <button
        onClick={() => router.push("/")}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Go to Home
      </button>
      <br />
      {claimable ? <ClaimMileStone /> : <p>already claimed</p>}
    </div>
  );
}
