import Image from "next/image";

export default function Page() {
  return (
    <>
      <h1>
        <a href="./things/main-page.html">
          Tashan and Christina&apos;s Media Logger!
        </a>
      </h1>

      <div>
        <h1>Profiles</h1>
        <div>
          <div>
            <Image src="/tashan.jpg" alt={""} />
            <span>Tashan</span>
          </div>
          <div>
            <a href="./things/main-page.html">
              <Image src="/christina.PNG" alt={""} />
            </a>
            <span>Christina</span>
          </div>
          <div>
            <Image src="/guest.png" alt={""} />
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
