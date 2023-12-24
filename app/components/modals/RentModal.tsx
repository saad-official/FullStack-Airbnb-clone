import useRentModal from "@/app/hooks/useRentModal";
import Model from "./Model";

const RentModal = () => {
  const rentModal = useRentModal();
  return (
    <Model
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel="Submit"
      title="Airbnb your Home!"
    />
  );
};

export default RentModal;
