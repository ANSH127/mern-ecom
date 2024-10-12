export default function Footer() {
  return (
    <footer className=" text-black py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Designed by{" "}
          <a
            href="https://anshdev.vercel.app/"
            className="hover:underline text-blue-500
          

          "
            target="_blank"
            rel="noreferrer"
          >
            Ansh
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
