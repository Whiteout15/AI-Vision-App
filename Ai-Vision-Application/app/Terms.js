import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/terms.style";
import Header from "./Header";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";

function Terms() {
  const navigation = useRouter();
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Terms of Service" onPress={() => navigation.back()} />
      <View style={styles.titleContainer} />
      <Text style={styles.subText}>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </Text>

      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
      />

      <TouchableOpacity
        style={styles.button}
        title="Continue to Test"
        onPress={() => {
          if (isChecked) {
            navigation.push("Glasses");
          } else {
            alert("Please agree to the terms of service to continue");
          }
        }}
      >
        <Text style={styles.text}>I Agree</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Terms;
