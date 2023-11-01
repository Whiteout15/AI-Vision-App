import { Text, View, TouchableOpacity, CheckBox } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/terms.style";
import Header from "./Header";

function Terms() {

  const navigation = useRouter();
  return (
    <SafeAreaView style={styles.container}>
        <Header title="Terms of Service" onPress={() => navigation.goBack()}/>
        <View style={styles.titleContainer}>
        
        </View>
      <Text style={styles.subText}>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
      </Text>
      <TouchableOpacity
        style={styles.button}
        title="Continue to Test"
        onPress={() => {
          navigation.push("Glasses");
        }}
      >
        <Text style={styles.text}>I Agree</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Terms;