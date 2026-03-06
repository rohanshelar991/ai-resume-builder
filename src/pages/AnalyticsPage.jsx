import React from "react";

const metrics = [
  { label: "Resume Views", value: "1,482" },
  { label: "Downloads", value: "312" },
  { label: "Recruiter Clicks", value: "87" },
  { label: "Share Links", value: "54" },
];

const AnalyticsPage = () => {
  return (
    <div className="px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track how recruiters engage with your resumes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="form-card">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="form-card space-y-4">
            <h3 className="font-semibold text-lg">Top Performing Resumes</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Senior Frontend Resume</span>
                <span>642 views</span>
              </div>
              <div className="flex justify-between">
                <span>Product Designer Resume</span>
                <span>501 views</span>
              </div>
              <div className="flex justify-between">
                <span>Data Scientist Resume</span>
                <span>339 views</span>
              </div>
            </div>
          </div>
          <div className="form-card space-y-4">
            <h3 className="font-semibold text-lg">Engagement Insights</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>Resume shares increased by 24% this week.</li>
              <li>Most clicks are from LinkedIn traffic.</li>
              <li>Templates 3 and 8 convert best in tech roles.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
