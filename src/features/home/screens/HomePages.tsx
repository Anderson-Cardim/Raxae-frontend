import Header from "../components/Header";
import StatsSection from "../components/StatsSection";
import MyGroups from "../components/MyGroup";
import Disney from "../../../assets/ImagemDisney.svg";
import Aluguel from "../../../assets/ImagemAluguel.svg";
import ActionButton from "../../../components/ui/ActionButton";
import FooterNav from "../../../components/layout/FooterNav";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const userData = {
    name: "Pedro",
    profilePic: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
    pendingMembers: 4,
    totalGroups: 2,
    totalSaved: 436.58,
    totalPaid: 814.64,
  };

  const groupsData = [
    { name: "Disney", value: 14.64, icon: Disney },
    { name: "Aluguel Mi...", value: 800.0, icon: Aluguel },
  ];

  const handleNext = () => {
    navigate("/criar-novo-grupo");
  };

  return (
    <div className="home-page-container pb-20">
      <Header userName={userData.name} profilePic={userData.profilePic} />

      <StatsSection stats={userData} />

      <MyGroups groups={groupsData} />

      <div className="p-4 pt-4">
        <ActionButton
          text="ADICIONAR GRUPO"
          onClick={handleNext}
          className="w-full py-4 text-white bg-[#F34403] hover:bg-orange-600 rounded-2xl font-bold transition-colors duration-300"
        />
      </div>
      <FooterNav />
    </div>
  );
}

export default HomePage;
