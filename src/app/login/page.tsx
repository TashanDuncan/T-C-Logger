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
            <img src="./assets/c80dc137-65a8-4995-aa47-0ed96e339e39.jpg" />
            <span>Tashan</span>
          </div>
          <div>
            <a href="./things/main-page.html">
              <img src="./assets/christina.PNG" />
            </a>
            <span>Christina</span>
          </div>
          <div>
            <img src="./assets/guest.png" />
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
