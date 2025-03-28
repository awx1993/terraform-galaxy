/ (AWS/Azure/GCP) /
const [activeTab, setActiveTab] = useState("aws");

<Tabs>
  <Tab onClick={() => setActiveTab("aws")} active={activeTab === "aws"}>AWS</Tab>
  <Tab onClick={() => setActiveTab("azure")}>Azure</Tab>
  <Tab onClick={() => setActiveTab("gcp")}>GCP</Tab>
</Tabs>