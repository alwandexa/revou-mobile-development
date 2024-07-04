/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import Avatar from "./src/components/atoms/Avatar";
import Typography from "./src/components/atoms/Typography";
import Button from "./src/components/molecules/Button";
import {COLORS} from "./src/constants/colors";
import Heart from "./src/assets/images/Heart";
import Label from "./src/components/molecules/Label";
import TextField from "./src/components/molecules/TextField";

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={{padding: 20, gap: 5}}>
        <View>
          <TextField label="Nama" state="negative"/>
        </View>
        <Typography
          type="heading"
          size="xxlarge"
          style={{color: COLORS.purple400}}>
          alwan
        </Typography>
        <View style={{flexDirection: "row", gap: 10}}>
          <Avatar size="xxlarge" />
          <Avatar size="xlarge" />
          <Avatar size="large" />
          <Avatar size="medium" />
          <Avatar size="small" />
          <Avatar size="xsmall" />
        </View>
        <View style={{flexDirection: "column", gap: 10}}>
          <Button
            variant={"primary"}
            size={"large"}
            customStyle={{width: "auto"}}>
            Button
          </Button>
          <Button variant={"primary"} size={"medium"} icon={Heart} />
          <Button variant={"outline"} size={"large"} disabled>
            Button
          </Button>
          <Button
            variant={"tertiary"}
            size={"large"}
            icon={Heart}
            iconPosition="right"
            disabled></Button>
          <Button variant={"link"} size={"large"}>
            Button
          </Button>
        </View>
        <View>
          <Button variant="primary" size="large" disabled>
            Masuk
          </Button>
        </View>
        <View>
          <Label variant="tertiary" color="red">
            alwan wirawan
          </Label>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default App;
