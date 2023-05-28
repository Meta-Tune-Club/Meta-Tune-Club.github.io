import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface ContractorJobProps {
    session: any;
}


// Assuming you have functions for fetching the job list and accepting a job from the API
async function fetchJobs() {
  const response = await fetch("/api/jobs");
  const data = await response.json();
  return data.jobs;
}

async function acceptJob(jobId: any) {
  const response = await fetch("/api/acceptJob", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobId }),
  });
  const data = await response.json();
  return data;
}

export default function HomeownerJobs({ session }: ContractorJobProps) {
  const wallet = useWallet();
  const user_wallet = session.user.name;
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadJobs() {
      const fetchedJobs = await fetchJobs();
      setJobs(fetchedJobs);
    }
    loadJobs();
  }, []);

  const handleAcceptJob = async (jobId:any) => {
    const result = await acceptJob(jobId);
    // Update the jobs list or perform any necessary action based on the response
    console.log(result);
  };

  return (
    <div>
      <h1>List of Jobs</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <button onClick={() => handleAcceptJob(job.id)}>
                Accept Job
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}
