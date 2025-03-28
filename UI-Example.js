// components/ProviderTabs.js
export default function ProviderTabs() {
    const [activeTab, setActiveTab] = useState('aws');
  
    return (
      <div>
        <button onClick={() => setActiveTab('aws')} className={activeTab === 'aws' ? 'active' : ''}>
          AWS
        </button>
        <button onClick={() => setActiveTab('azure')}>Azure</button>
        <button onClick={() => setActiveTab('gcp')}>GCP</button>
        
        {activeTab === 'aws' && <AWSModules />}
        {activeTab === 'azure' && <AzureModules />}
        {activeTab === 'gcp' && <GCPModules />}
      </div>
    );
  }