import { useGlobalContext } from "./context";

const Notif = () => {
  const { notif, openNotif } = useGlobalContext();

  return (
    <div className={openNotif ? "notif open" : "notif"}>
      <h1>{notif}</h1>
    </div>
  );
};

export default Notif;
