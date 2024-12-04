import { useSession } from "@/context/SessionContext";

const WelcomeComponent = () => {
  const { memoizedSession } = useSession();

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-2xl font-light text-center">
        Welcome <br />
        <span className="text-3xl font-semibold">
          {memoizedSession.name} 👋
        </span>
      </h1>
    </div>
  );
};

export default WelcomeComponent;
