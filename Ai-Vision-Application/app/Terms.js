import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../assets/screenstyles/homescreen.style";
import Header from "./Header";

function Terms() {

  const navigation = useRouter();
  return (
    <SafeAreaView style={styles.container}>
        <Header title="Detail Screen" onBackPress={() => navigation.goBack("index")} />
        <View style={styles.titleContainer}>
        

            <Text style={styles.title}>Terms of Service</Text>
        </View>
      <Text>
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
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Terms;