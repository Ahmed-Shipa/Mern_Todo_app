import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="w-[80%] mx-auto">
      <div className="flex-col content-center relative w-[50%] max-lg:w-[70%] max-md:w-[80%] mx-auto mt-30">
        <h1 className="text-6xl max-sm:text-5xl font-semibold">
          Organize your
        </h1>
        <h1 className="text-6xl max-sm:text-5xl font-semibold">
          work and life, finally.
        </h1>
        <div className="justify-self-center">
          <p className="mt-5 w-80 text-[17px]">
            Become focused, organized, and calm with todo app. The World 1st
            task manger app
          </p>
        </div>

        <Link
          to={"/todo"}
          className="py-2 px-4 mt-5 absolute left-52 max-sm:w-42 max-sm:left-20 text-white bg-red-600 font-bold hover:bg-black cursor-pointer rounded-xl"
        >
          Make Todo List
        </Link>
      </div>
    </section>
  );
}
