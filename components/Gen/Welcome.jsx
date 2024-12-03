import { useSession } from "@/context/SessionContext";

const WelcomeComponent = () => {
  const { session } = useSession();

  return (
    <div className="w-full flex justify-center items-center mb-8">
      <h1 className="text-2xl font-light text-center">
        Welcome <br />
        <span className="text-3xl font-semibold">{session.name} 👋</span>
      </h1>
    </div>
  );
};

export default WelcomeComponent;
