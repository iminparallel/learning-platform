import { useRouter } from "next/navigation";

export default function Assgnment() {
  const project = "saladFinger";
  const assignment = "1";
  router.push(`/test?project=${project}&assignment=${assignment}`);
}
