
import React, { useRef, useEffect, useState } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

const PoseDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [stage, setStage] = useState(null);
  const stageRef = useRef(null);
  let camera = null;
  let pose = null;
  const [isSaved, setIsSaved] = useState(false);

  const calculateAngle = (a, b, c) => {
    const radians =
      Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    return angle > 180 ? 360 - angle : angle;
  };

  const calculateKneeAngle = (hip, knee, ankle) => {
    return calculateAngle(hip, knee, ankle);
  };

  const calculateOverheadPressAngle = (shoulder, elbow, wrist) => {
    return calculateAngle(shoulder, elbow, wrist);
  };

  useEffect(() => {
    return () => {
      if (camera) {
        camera.stop();
      }
    };
  }, []);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const onResults = (results) => {
    if (!canvasRef.current || !videoRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.image) {
      ctx.save();
      ctx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    if (results.poseLandmarks) {
      drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
      drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 1, radius: 3 });

      // **Bicep Curl Angle Calculation**
      const shoulder = results.poseLandmarks[12];
      const elbow = results.poseLandmarks[14];
      const wrist = results.poseLandmarks[16];

      if (shoulder && elbow && wrist) {
        const bicepCurlAngle = calculateOverheadPressAngle(shoulder, elbow, wrist);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`Elbow Angle: ${bicepCurlAngle.toFixed(1)}°`, 10, 30);

        if (bicepCurlAngle > 160) {
          if (stageRef.current === 'bent') {
            setCounter((prevCount) => prevCount + 1);
            setStage('straight');
          } else if (stageRef.current === null) {
            setStage('straight');
          }
        } else if (bicepCurlAngle < 60 && stageRef.current === 'straight') {
          setStage('bent');
        }
      }

      // **Overhead Press Angle Calculation**
      const shoulderOverhead = results.poseLandmarks[12]; // Right shoulder
      const elbowOverhead = results.poseLandmarks[14]; // Right elbow
      const wristOverhead = results.poseLandmarks[16]; // Right wrist

      if (shoulderOverhead && elbowOverhead && wristOverhead) {
        const overheadPressAngle = calculateOverheadPressAngle(shoulderOverhead, elbowOverhead, wristOverhead);
        ctx.fillText(`Overhead Press Angle: ${overheadPressAngle.toFixed(1)}°`, 10, 60);

        if (overheadPressAngle > 160) {
          if (stageRef.current === 'lowered') {
            setCounter((prevCount) => prevCount + 1);
            setStage('raised');
          } else if (stageRef.current === null) {
            setStage('raised');
          }
        } else if (overheadPressAngle < 60 && stageRef.current === 'raised') {
          setStage('lowered');
        }
      }

      // **Squat Angle Calculation**
      const hip = results.poseLandmarks[11]; // Left hip
      const knee = results.poseLandmarks[13]; // Left knee
      const ankle = results.poseLandmarks[15]; // Left ankle

      if (hip && knee && ankle) {
        const squatAngle = calculateKneeAngle(hip, knee, ankle);
        ctx.fillText(`Knee Angle: ${squatAngle.toFixed(1)}°`, 10, 90);

        if (squatAngle < 60) {
          if (stageRef.current === 'standing') {
            setCounter((prevCount) => prevCount + 1);
            setStage('squatting');
          } else if (stageRef.current === null) {
            setStage('squatting');
          }
        } else if (squatAngle > 160 && stageRef.current === 'squatting') {
          setStage('standing');
        }
      }

      ctx.fillText(`Stage: ${stageRef.current || 'Initializing...'}`, 10, 120);
    }

    ctx.restore();
  };

  useEffect(() => {
    if (videoRef.current) {
      pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);

      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await pose.send({ image: videoRef.current });
        },
        width: 480,
        height: 360,
      });

      camera.start();
    }
  }, []);

  const resetCounter = () => {
    setCounter(0);
    setStage(null);
  };

  const saveCounter = async () => {
    if (isSaved) return; // Prevent multiple saves
  
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/workouts/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token, // Remove "Bearer "
        },
        body: JSON.stringify({ reps: counter }),
      });
  
      const result = await response.json();
      console.log("Workout saved:", result);
  
      alert("Data saved successfully!"); // Show success alert
      setIsSaved(true); // Disable save button after successful save
    } catch (error) {
      console.error("Error saving workout:", error);
      alert("Failed to save data. Please try again."); // Show error alert
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 text-white">
      <div className="flex flex-col sm:flex-row items-center bg-gray-800 p-4 rounded-lg shadow-lg gap-4">
        {/* Video + Canvas */}
        <div className="relative w-[480px] h-[360px]">
          <video ref={videoRef} className="hidden" />
          <canvas ref={canvasRef} className="w-full h-full rounded-lg shadow-lg" />
        </div>

        {/* Counter & Controls */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-md shadow-md w-[200px]">
          <h2 className="text-lg font-semibold mb-2">Workout Tracker</h2>
          <p className="text-md mb-2">Reps: <span className="font-bold text-orange-400">{counter}</span></p>
          <p className="text-md mb-3">Stage: {stage || 'Initializing...'}</p>

          <button
            onClick={resetCounter}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md mb-2 w-full transition duration-300"
          >
            Reset
          </button>

          <button
            onClick={saveCounter}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md w-full transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoseDetector;
