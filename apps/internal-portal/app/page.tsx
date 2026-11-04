"use client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { FamilyReceiveComponent } from "@repo/ui/components/family-receive-button";
import { MeetingCard } from "@repo/ui/components/meeting-card";
import { CreateNewDisclosure } from "@repo/ui/components/create-new-disclosure";
import { InlineOverflow } from "@repo/ui/components/inline-overflow";
import { AddCashDisclosure } from "@repo/ui/components/add-cash-disclosure";
import { useState } from "react";
import { FloatingInput } from "@repo/ui/components/floating-input";
import { ScheduleButton } from "@repo/ui/components/schedule-button";
import { VoiceChatDisclosure } from "@repo/ui/components/voice-chat-disclosure";
import { PinItemComponent } from "@repo/ui/components/pin-item";
import {
  // ChangeablePricingSection,
  Plan,
} from "@repo/ui/components/changeable-pricing-section";
import {
  TaskData,
  TaskWidget,
} from "@repo/ui/components/task-widget-disclosure";
import { IoFastFood } from "react-icons/io5";
import {
  FaChargingStation,
  FaPills,
  FaSailboat,
  FaUtensils,
} from "react-icons/fa6";
type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};
const visibleActions = [{ label: "Save" }, { label: "Copy" }];

const hiddenActions = [{ label: "Share" }, { label: "Delete" }];

export default function Home() {
  const [balance, setBalance] = useState(34.0);

  const handleAddCash = (amount: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setBalance((prev) => prev + amount);
        resolve();
      }, 2000);
    });
  };
  const MOCK_DATA: TaskData = {
    title: "Design System",
    progress: 75,
    completedCount: 3,
    totalCount: 4,
    priority: "Urgent",
    status: "In Progress",
    subtasks: [
      { id: "1", title: "Design Tokens", completed: true },
      { id: "2", title: "Color System", completed: true },
      { id: "3", title: "Type System", completed: true },
      { id: "4", title: "Documentation", completed: false },
    ],
    assignees: [
      {
        name: "Chloe",
        avatar: "https://i.pravatar.cc/150?u=chloe",
        color: "bg-white dark:bg-gray-900",
      },
      {
        name: "Anna",
        avatar: "https://i.pravatar.cc/150?u=anna",
        color: "bg-white",
      },
      {
        name: "Ramesh",
        avatar: "https://i.pravatar.cc/150?u=ramesh",
        color: "bg-white",
      },
    ],
  };
  const items = [
    {
      id: 1,
      name: "Harbor Bay Marina",
      type: "Marina",
      status: "Closes 7:00 PM",
      icon: IoFastFood,
      pinned: false,
    },
    {
      id: 2,
      name: "Mocha Brew",
      type: "Cafe",
      status: "Closes 9:00 PM",
      icon: FaSailboat,
      pinned: false,
    },
    {
      id: 3,
      name: "Olive Bistro",
      type: "Restaurant",
      status: "Closes 11:00 PM",
      icon: FaUtensils,
      pinned: false,
    },
    {
      id: 4,
      name: "GreenVolt Hub",
      type: "EV Charger",
      status: "Open 24 hours",
      icon: FaChargingStation,
      pinned: false,
    },
    {
      id: 5,
      name: "CarePlus Pharmacy",
      type: "Pharmacy",
      status: "Open 24 hours",
      icon: FaPills,
      pinned: false,
    },
  ];
  const demoPlans: Plan[] = [
    {
      id: "pro",
      name: "Pro",
      description: "Best for individuals & small teams",
      priceMonthly: "$4.99",
      priceYearly: "$3.99",
      featuresLabel: "CORE FEATURES:",
      features: [
        { text: "Up to 10 users", hasInfo: false },
        { text: "Basic reporting", hasInfo: false },
        { text: "Standard support", hasInfo: false },
      ],
    },
    {
      id: "business",
      name: "Business",
      description: "Best for mid-sized teams",
      priceMonthly: "$9.99",
      priceYearly: "$7.99",
      badge: "POPULAR",
      featuresLabel: "EVERYTHING IN PRO, PLUS:",
      features: [
        { text: "Custom workflows & task statuses", hasInfo: false },
        { text: "Role-based permissions", hasInfo: false },
        { text: "Automations", hasInfo: true },
        { text: "Advanced dashboards", hasInfo: true },
        { text: "Integrations", hasInfo: true },
        { text: "Priority support", hasInfo: false },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Best for large organizations & regulated industries",
      priceMonthly: "$39.99",
      priceYearly: "$31.99",
      featuresLabel: "EVERYTHING IN BUSINESS, PLUS:",
      features: [
        { text: "Unlimited users", hasInfo: false },
        { text: "Dedicated success manager", hasInfo: false },
        { text: "Custom SLAs & advanced security", hasInfo: false },
      ],
    },
  ];
  return (
    <div className={styles.page}>
      <main className={"w-full h-full"}>
        <div className="flex flex-col pb-50">
          <CreateNewDisclosure />
          <InlineOverflow
            visibleActions={visibleActions}
            hiddenActions={hiddenActions}
          />

          <AddCashDisclosure
            initialBalance={balance}
            onConfirm={handleAddCash}
            cards={[
              { id: "1", last4: "6756", brand: "VISA", isDefault: true },
              { id: "2", last4: "4632", brand: "MASTERCARD", hasToggle: true },
            ]}
            presets={[50, 100, 300]}
          />

          <TaskWidget data={MOCK_DATA} />
          <div className="w-fit p-5 flex flex-col gap-3 mt-10">
            <FloatingInput label="Email Address" type="email" />
            <FloatingInput label="Password" type="password" />
          </div>
          <ScheduleButton />
          <VoiceChatDisclosure />
          <div className="mt-10">
            <PinItemComponent items={items} />
          </div>
          {/* <ChangeablePricingSection
            plans={demoPlans}
            defaultPlanId="business"
            onContinue={(planId, cycle) =>
              console.log(`Selected: ${planId}, Cycle: ${cycle}`)
            }
          /> */}
          <MeetingCard
            title={""}
            date={""}
            time={""}
            duration={""}
            meetingLink={""}
            notification={""}
            participants={[]}
            description={""}
          />
        </div>
      </main>
    </div>
  );
}
