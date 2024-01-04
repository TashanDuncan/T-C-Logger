import Image from "next/image";

export default function Page() {
  return (
    <>
      <h1>Login</h1>
      <div>
        <h1>Profiles</h1>
        <div>
          <div>
            <Image src="/tashan.jpg" alt={""} width={200} height={200} />
            <span>Tashan</span>
          </div>
          <div>
            <Image src="/christina.png" alt={""} width={200} height={200} />
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
    </>
  );
}
