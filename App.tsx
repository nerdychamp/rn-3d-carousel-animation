// Inspiration: https://dribbble.com/shots/3147975-Product-Page-Interaction?1481310235
// Images from Pexels.com: https://www.pexels.com/collections/abstract-art-4cxqlt3/

import * as React from 'react';
import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import faker from 'faker';
import { StatusBar } from 'expo-status-bar';

const images = [
  'https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1698394/pexels-photo-1698394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

faker.seed(10);

interface IData {
  key: any;
  image: string;
  title: any;
  subtitle: any;
  price: any;
}

const DATA: IData[] = [...Array(images.length).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: images[i],
    title: faker.commerce.productName(),
    subtitle: faker.company.bs(),
    price: faker.finance.amount(80, 200, 0),
  };
});

const { width, height } = Dimensions.get('screen');
const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const SPACING = 20;

export default function () {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const imageRef = React.useRef<FlatList<IData>>(null);

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);

    imageRef?.current?.scrollToIndex({
      index,
      viewOffset: SPACING * 2,
      animated: true,
    });
  };

  // const _onViewableItemsChanged = React.useCallback(
  //   ({ viewableItems, changed }) => {
  //     setActiveIndex(changed[0].index);
  //   },
  //   [],
  // );

  // const _viewabilityConfig = {
  //   itemVisiblePercentThreshold: 50,
  // };

  return (
    <View style={{ backgroundColor: '#A5F1FA', flex: 1 }}>
      <StatusBar hidden />
      <SafeAreaView style={{ marginTop: SPACING * 4 }}>
        <View style={{ height: IMAGE_HEIGHT * 2.1 }}>
          <FlatList
            data={DATA}
            ref={imageRef}
            style={{ flexGrow: 0 }}
            initialScrollIndex={0}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              height: IMAGE_HEIGHT + SPACING * 2,
              paddingHorizontal: SPACING * 2,
            }}
            // onViewableItemsChanged={_onViewableItemsChanged}
            // viewabilityConfig={_viewabilityConfig}
            onMomentumScrollEnd={(e) => {
              setActiveIndex(Math.floor(e.nativeEvent.contentOffset.x / width));
            }}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width,
                    paddingVertical: SPACING,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              );
            }}
          />
          <View
            style={{
              width: IMAGE_WIDTH,
              alignItems: 'center',
              paddingHorizontal: SPACING * 2,
              marginLeft: SPACING * 2,
            }}
          >
            <Content item={DATA[0]} />
          </View>
          <View
            style={{
              width: IMAGE_WIDTH + SPACING * 2,
              position: 'absolute',
              backgroundColor: 'white',
              backfaceVisibility: 'visible',
              zIndex: -1,
              top: SPACING * 2,
              left: SPACING,
              bottom: 0,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: IMAGE_WIDTH + SPACING * 4,
            paddingHorizontal: SPACING,
            paddingVertical: SPACING,
          }}
        >
          <TouchableOpacity
            onPress={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0 ? true : false}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign
                name="swapleft"
                size={42}
                color={activeIndex === 0 ? 'grey' : 'black'}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '800',
                  color: `${activeIndex === 0 ? 'grey' : 'black'}`,
                }}
              >
                PREV
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === DATA.length - 1 ? true : false}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '800',
                  color: `${
                    activeIndex === DATA.length - 1 ? 'grey' : 'black'
                  }`,
                }}
              >
                NEXT
              </Text>
              <AntDesign
                name="swapright"
                size={42}
                color={activeIndex === DATA.length - 1 ? 'grey' : 'black'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

function Content({ item }) {
  return (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 16,
          textTransform: 'uppercase',
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {item.title}
      </Text>
      <Text style={{ fontSize: 12, opacity: 0.4 }}>{item.subtitle}</Text>
      <View style={{ flexDirection: 'row', marginTop: SPACING }}>
        <Text
          style={{
            fontSize: 42,
            letterSpacing: 3,
            fontWeight: '900',
            marginRight: 8,
          }}
        >
          {item.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 36,
            fontWeight: '800',
            alignSelf: 'flex-end',
          }}
        >
          USD
        </Text>
      </View>
    </>
  );
}
