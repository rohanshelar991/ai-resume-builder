import React, { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import { Camera, X } from "lucide-react";

const ProfilePhoto = () => {
  const { resumeData, updateResumeData } = useContext(ResumeContext);
  const { profilePhoto } = resumeData;

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateResumeData("profilePhoto", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateResumeData("profilePhoto", "");
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="form-label flex items-center gap-2">
        <Camera size={16} />
        Profile Photo
      </label>
      <div className="flex items-center gap-4">
        <div className="relative">
          {profilePhoto ? (
            <>
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-border"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Remove photo"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-400">
              <Camera size={24} className="text-gray-500" />
            </div>
          )}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="btn-outline cursor-pointer inline-block"
          >
            {profilePhoto ? "Change Photo" : "Upload Photo"}
          </label>
          <p className="text-xs text-muted-foreground mt-2">
            JPG, PNG, or GIF (max 2MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;