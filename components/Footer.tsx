import Link from "next/link";

const dataFooter = [
  {
    id: 1,
    name: "Mi cuenta",
    link: "#",
  },
  {
    id: 2,
    name: "Galeria 🖼️",
    link: "#",
  },
  {
    id: 3,
    name: "Compartidos 📷",
    link: "#",
  },
  {
    id: 4,
    name: "Likes ❤️",
    link: "#",
  },
];

const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-white">
            <span className="font-bold">Foto</span>
            Aventuras
          </p>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
            {dataFooter.map((data) => (
              <li key={data.id}>
                <Link href={data.link} className="hover:underline me-4 md:me-6">
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-6 borde border-t-2 border-white sm:mx-auto lg:my-8"></div>

        <span className="block text-sm text-white sm:text-center ">
          &copy; 2024
          <Link href="#">ManuDev. </Link>
          Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
};

export default Footer;
