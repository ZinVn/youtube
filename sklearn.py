pfrom sklearn.neighbors import NearestNeighbors
import numpy as np

# Giả sử dữ liệu về người dùng và video đã được mã hóa thành số
video_features = np.array([
    [1, 0, 0],  # Video 1
    [0, 1, 0],  # Video 2
    [0, 0, 1],  # Video 3
])

user_history = np.array([[1, 0, 0]])  # Người dùng xem Video 1

# Dùng KNN để tìm video tương tự
model = NearestNeighbors(n_neighbors=2, metric="cosine")
model.fit(video_features)
distances, indices = model.kneighbors(user_history)

print("Gợi ý video:", indices)
