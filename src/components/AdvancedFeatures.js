import { DashboardContent } from "./DashboardContent";
import { Card } from "./Card";
import { ReactComponent as Booking } from "../icons/booking.svg";

export function AdvancedFeatures(props) {
  return (
    <>
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
      <div style={{ height: "32px" }} />

      <DashboardContent
        title="Already Installed Features"
        subtitle="These tools are already installed and activated and ready for use."
      >
        <div className="nfd-ecommerce-extended-actions-container">
          <Card
            variant="extended-selected"
            title="Manage bookable/rental products"
            action="Enable"
            href="Enable"
            description="Enable a booking/appointment system to manage renting or booking of services, rooms, houses."
          >
            <Booking />
          </Card>
          <Card
            variant="extended-selected"
            title="Add a powerful search to your store"
            action="Enable"
            href="Enable"
            description="Allow your users to search products in real timeby title, description, tags and more."
          >
            <Booking />
          </Card>
        </div>
      </DashboardContent>
    </>
  );
}
