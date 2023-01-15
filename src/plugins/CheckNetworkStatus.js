import * as Network from 'expo-network';

const CheckNetworkStatus = async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (networkState.isConnected) {
      return true;
    } else {
      return false;
    }
  };

export default CheckNetworkStatus;
