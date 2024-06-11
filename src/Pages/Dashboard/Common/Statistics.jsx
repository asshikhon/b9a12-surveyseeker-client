import useAuth from "../../../hooks/useAuth";
import title from "../../../assets/images/title.jpg"

const Statistics = () => {
const {user} = useAuth();


    return (
        <div className="text-center">

<div
        className="w-full h-40 text-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${title})` }}
      >
        <h2 className="text-4xl text-[#faf3e0] font-bold">Welcome To Dashboard {user?.displayName} </h2>

      </div>

            

        </div>
    );
};

export default Statistics;