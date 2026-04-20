import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Order() {
  const { orders } = useAppStore();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOrderPress = (order: any) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 顶部横幅 */}
      <View style={styles.banner}>
        <Image 
          source={{ uri: 'https://picsum.photos/400/200' }} 
          style={styles.bannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>加入快狗打车</Text>
          <Text style={styles.bannerSubtitle}>海量订单 多劳多得</Text>
          <View style={styles.bannerTags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>知名品牌</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>自由出工</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>收入有保障</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>立即加盟</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 订单列表 */}
      <View style={styles.ordersList}>
        {orders.map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.orderItem}
            onPress={() => handleOrderPress(order)}
          >
            <View style={styles.orderInfo}>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={16} color="#4CAF50" />
                <Text style={styles.locationText}>{order.from}</Text>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={16} color="#F44336" />
                <Text style={styles.locationText}>{order.to}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceText}>¥{order.price.toFixed(2)}</Text>
                {order.补贴 && (
                  <View style={styles.subsidyTag}>
                    <Text style={styles.subsidyText}>平台补贴{order.补贴}元</Text>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>立即接单</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* 订单详情弹窗 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalClose} onPress={handleCloseModal}>
              <Ionicons name="close" size={24} color="#333333" />
            </TouchableOpacity>
            {selectedOrder && (
              <View>
                <View style={styles.modalHeader}>
                  <View style={styles.orderTypeTag}>
                    <Text style={styles.orderTypeText}>{selectedOrder.type}</Text>
                  </View>
                  <Text style={styles.distanceText}>距您{selectedOrder.distance}</Text>
                </View>
                <View style={styles.modalLocation}>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="#4CAF50" />
                    <Text style={styles.locationText}>{selectedOrder.from}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color="#F44336" />
                    <Text style={styles.locationText}>{selectedOrder.to}</Text>
                  </View>
                </View>
                <View style={styles.modalPrice}>
                  <Text style={styles.modalPriceText}>¥{selectedOrder.price.toFixed(2)}</Text>
                  {selectedOrder.补贴 && (
                    <View style={styles.subsidyTag}>
                      <Text style={styles.subsidyText}>平台补贴{selectedOrder.补贴}元</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.modalAcceptButton}>
                  <Text style={styles.modalAcceptButtonText}>立即接单</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  banner: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
  bannerContent: {
    padding: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  bannerTags: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
  },
  joinButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ordersList: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
    marginRight: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 8,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
  },
  subsidyTag: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  subsidyText: {
    fontSize: 12,
    color: '#FF9800',
  },
  acceptButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderTypeTag: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  orderTypeText: {
    fontSize: 12,
    color: '#2196F3',
  },
  distanceText: {
    fontSize: 14,
    color: '#666666',
  },
  modalLocation: {
    marginBottom: 16,
  },
  modalPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalPriceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
  },
  modalAcceptButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalAcceptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
