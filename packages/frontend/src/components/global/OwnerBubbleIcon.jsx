import home from '../../assets/images/home.png';
import user from '../../assets/images/user.png';
import share from '../../assets/images/share.png';


const OwnerBubbleIcon = ({ item, itemType }) => {

  const getImage = () => {
    if (item.isGlobalItem) {
      return home;
    }
    else if (item.isShared) {
      return share;
    }
    else {
      return user;
    }
  }

  const getTitle = () => {
    if (item.isGlobalItem) {
      return `Ce${itemType === "dish" ? " plat" : "t ingrédient"} est commun à tous les utilisateurs`;
    }
    else if (item.isShared) {
      return `Un autre utilisateur vous a partagé ce${itemType === "dish" ? " plat" : "t ingrédient"}`
    }
    else {
      return `Vous êtes le créateur de ce${itemType === "dish" ? " plat" : "t ingrédient"}`;
    }
  }

  return (
    <div className="absolute cursor-help top-[-4px] right-[-4px]  border-2 rounded-full p-1 bg-white z-40">
      <img
        src={getImage()}
        title={getTitle()}
        alt="owner-bubble-icon"
        className="w-3 h-3"
      />
    </div>
  )
}

export default OwnerBubbleIcon;