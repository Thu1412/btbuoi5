import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

const CustomNavigationBar = ({ navigation, route, options, back }) => {
  const [visible, setVisible] = useState(false);
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      )}

      <Appbar.Content title={title} />

      {!back && (
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<Appbar.Action icon="dots-vertical" onPress={() => setVisible(true)} />}
        >
          <Menu.Item onPress={() => navigation.navigate("Home")} title="Home" />
            <Menu.Item onPress={() => navigation.navigate("Hometodo")} title="Todo" />
          <Menu.Item onPress={() => navigation.navigate("Setting")} title="Setting" />
        </Menu>
      )}
    </Appbar.Header>
  );
};

export default CustomNavigationBar;
