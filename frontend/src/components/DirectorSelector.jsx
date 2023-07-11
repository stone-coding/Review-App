import React from "react";

export default function DirectorSelector() {
  return (
    <div>
      <Label htmlFor="director">Director</Label>
      <LiveSearch
        name="director"
        value={director.name}
        placeholder="Search Profile"
        results={directorsProfile}
        renderItem={renderItem}
        onSelect={updateDirector}
        onChange={handleProfileChange}
        visible={directorsProfile.length}
      ></LiveSearch>
    </div>
  );
}
