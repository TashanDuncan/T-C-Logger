import Image from "next/image";

export default function ProfileSelection({
  setSelectedProfile,
}: {
  setSelectedProfile: any;
}) {
  return (
    <div>
      <h1>Who are you?</h1>
      <div>
        <div>
          <Image
            src="/tashan.jpg"
            alt={""}
            width={200}
            height={200}
            onClick={() => setSelectedProfile("tashan@test.com")}
          />
          <span>Tashan</span>
        </div>
        <div>
          <Image src="/christina.png" alt={""} width={200} height={200} onClick={() => setSelectedProfile("christina@test.com")} />
          <span>Christina</span>
        </div>
        <div>
          <Image src="/guest.png" alt={""} width={200} height={200} />
          <span>Guest</span>
        </div>
      </div>
      <div>
        <button>Manage Profiles</button>
      </div>
    </div>
  );
}
