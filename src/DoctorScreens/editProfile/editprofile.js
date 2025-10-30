import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Styles } from "./styles";
import { INput1 } from "../../Component/TextInput";
import DropdownComponent from "../../Component/Dropdown";
import { Governmentdata } from "../../dummy/dummydata";
import axios from "axios";
import { AppButton } from "../../Component/AppButton";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { useUser } from "../../context/UserContext";

export function Edit(props) {
  const { navigation } = props;
  const { user } = useUser();
  const token = user?.token;

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSpecialist, setNewSpecialist] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newFees, setNewFees] = useState("");
  const [newCapcity, setNewCapcity] = useState("");
  const [newGovernment, changeNewGovernment] = useState(null);
  const [newClinicName, setNewClinicName] = useState("");
  const [newClinicAddress, setNewClinicAddress] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [touchedGovern, setTouchedGovern] = useState(false);
  const [oldData, setOldData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:8000/api/profile/show", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response?.data?.data;
        if (data) {
          setOldData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            fees: String(data.fees) || "",
            experience: String(data.experience_year) || "",
            specialist: data.specialties?.[0] || "",
            bio: data.bio || "",
            capacity: String(data.capacity || ""),
            clinicgovernate: data.clinicgovernate || "",
            clinicname: data.clinicname?.replace(/\r?\n|\r/g, "") || "",
            clinicaddress: data.clinicaddress || "",
          });
          setImageUrl(data.image || null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) return;
      const asset = response.assets?.[0];
      if (asset) {
        setImageUrl(asset.uri);
        setImageFile({
          uri: asset.uri,
          name: asset.fileName || "profile.jpg",
          type: asset.type || "image/jpeg",
        });
      }
    });
  };

  const deleteProfilePicture = async () => {
    try {
      const response = await axios.delete("http://10.0.2.2:8000/api/profile/delete-picture", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setImageUrl(null);
        setImageFile(null);
        Alert.alert("Success", "Profile picture deleted successfully.");
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        Alert.alert("Info", error.response.data.msg);
      } else {
        Alert.alert("Error", "Failed to delete profile picture.");
        console.error("Delete error:", error.message || error);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const finalBio = newDescription ? `${oldData.bio}\n---\n${newDescription}` : oldData.bio;

      const formData = new FormData();
      formData.append("name", newName || oldData.name || "");
      formData.append("email", newEmail || oldData.email || "");
      formData.append("bio", finalBio || "");
      formData.append("fees", Number(newFees || oldData.fees || 0));
      formData.append("experience_year", Number(newExperience || oldData.experience || 0));
      formData.append("specialty", newSpecialist || oldData.specialist || "");
      formData.append("phone", newPhone || oldData.phone || "");
      formData.append("provider_type", "google");
      formData.append("capacity", Number(newCapcity || oldData.capacity || 0));
      formData.append("clinicgovernate", newGovernment || oldData.clinicgovernate || "");
      formData.append("clinicname", newClinicName || oldData.clinicname || "");
      formData.append("clinicaddress", newClinicAddress || oldData.clinicaddress || "");

      if (imageFile?.uri && !imageFile.uri.startsWith("http")) {
        const cleanedName = imageFile.name?.replace(/[^a-zA-Z0-9_.-]/g, "_") || "profile.jpg";
        formData.append("image", {
          uri: imageFile.uri,
          name: cleanedName,
          type: imageFile.type,
        });
      }

      formData.append("_method", "Post");

      const response = await axios.post("http://10.0.2.2:8000/api/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const updatedImage = response.data?.data?.image;
        if (updatedImage) setImageUrl(updatedImage);
        Alert.alert("Success", "Profile updated successfully!", [
          { text: "OK", onPress: () => navigation.navigate("DoctorInfoScreen") },
        ]);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        Alert.alert("Validation Error", JSON.stringify(error.response.data.errors));
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    }
  };

  const renderForm = useCallback(() => (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.textWrapper}>
        <Text style={Styles.text}>Edit Your Profile</Text>
      </View>

      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <View style={{ position: "relative" }}>
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("../../../assets/images/Doctorperson1.jpg")
            }
            style={[Styles.image, { borderRadius: 100 }]}
          />
          {/* الكاميرا */}
          <TouchableOpacity onPress={pickImage} style={Styles.cameraIconContainer}>
            <Icon name="camera" size={20} color="#007AFF" />
          </TouchableOpacity>

          {/* زر الحذف */}
          {imageUrl && (
            <TouchableOpacity
              onPress={deleteProfilePicture}
              style={{
                position: "absolute",
                bottom: 30,
                right: 0,
                backgroundColor: "#fff",
                borderRadius: 20,
                padding: 6,
                elevation: 4,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
              }}
            >
              <Icon name="trash-2" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={Styles.wrapper_textinput}>
        <Text style={Styles.label}>Name</Text>
        <INput1 placeholder={oldData.name} bordered value={newName} onChangeText={setNewName} />

        <Text style={Styles.label}>Email</Text>
        <INput1 placeholder={oldData.email} bordered value={newEmail} onChangeText={setNewEmail} />

        <Text style={Styles.label}>Phone</Text>
        <INput1 placeholder={oldData.phone} bordered value={newPhone} onChangeText={setNewPhone} />

        <Text style={Styles.label}>Fees</Text>
        <INput1 placeholder={oldData.fees} bordered value={newFees} onChangeText={setNewFees} />

        <Text style={Styles.label}>Experience (Years)</Text>
        <INput1 placeholder={oldData.experience} bordered value={newExperience} onChangeText={setNewExperience} />

        <Text style={Styles.label}>Specialist</Text>
        <INput1 placeholder={oldData.specialist} bordered value={newSpecialist} onChangeText={setNewSpecialist} />

        <Text style={Styles.label}>Governorate</Text>
        <DropdownComponent
          placeholder={oldData.clinicgovernate || "Select Government"}
          datatype={Governmentdata}
          value={newGovernment}
          onChange={(item) => changeNewGovernment(item.value)}
        />
        {touchedGovern && !newGovernment && <Text style={Styles.warn}>Select a Governorate</Text>}

        <Text style={Styles.label}>Clinic Name</Text>
        <INput1 placeholder={oldData.clinicname} bordered value={newClinicName} onChangeText={setNewClinicName} />

        <Text style={Styles.label}>Clinic Address</Text>
        <INput1 placeholder={oldData.clinicaddress} bordered value={newClinicAddress} onChangeText={setNewClinicAddress} />

        <Text style={Styles.label}>Bio (optional)</Text>
        <INput1 placeholder="New Bio (optional)" bordered value={newDescription} onChangeText={setNewDescription} />
      </View>

      <View style={Styles.wrapper_button}>
        <AppButton title="Save Changes" onPress={handleSaveChanges} />
      </View>
    </SafeAreaView>
  ), [
    oldData,
    newName,
    newEmail,
    newPhone,
    newFees,
    newExperience,
    newSpecialist,
    newDescription,
    newGovernment,
    newCapcity,
    imageUrl,
    imageFile,
    newClinicName,
    newClinicAddress,
  ]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={[{ key: "form" }]}
          renderItem={renderForm}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
