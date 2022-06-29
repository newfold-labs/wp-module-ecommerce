import { DashboardContent } from "./DashboardContent";
import { Card } from "./Card";
import { ReactComponent as Booking } from "../icons/booking.svg";

export function AdvancedFeatures(props) {
  return (
    <DashboardContent
      title="Advanced Features"
      subtitle="Enjoy the free add-ons included in your plan and improve your store."
    >
      <div className="nfd-ecommerce-extended-actions-container">
        <Card
          variant="extended"
          title="Manage bookable/rental products"
          action="Enable"
          href="Enable"
          description="Enable a booking/appointment system to manage renting or booking of services, rooms, houses."
        >
          <Booking />
        </Card>
        <Card
          variant="extended"
          title="Add a powerful search to your store"
          action="Enable"
          href="Enable"
          description="Allow your users to search products in real timeby title, description, tags and more."
        >
          <Booking />
        </Card>
      </div>
    </DashboardContent>
  );
}
