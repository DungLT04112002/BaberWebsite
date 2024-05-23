import cv2
import os
import numpy as np

# Hàm nhận diện khuôn mặt và xác định loại khuôn mặt
def detect_and_classify_faces(image_path):
    # Load ảnh
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Khởi tạo bộ lọc Cascade cho việc nhận diện khuôn mặt
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Nhận diện khuôn mặt
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))

    # Xác định loại khuôn mặt cho mỗi khuôn mặt được phát hiện
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]

        # Đối với mỗi khuôn mặt, bạn có thể thêm các bước xử lý và phân loại ở đây
        # Ví dụ, bạn có thể sử dụng một mô hình SVM đã được huấn luyện trước để phân loại khuôn mặt

        # Ví dụ đơn giản: tính toán tỉ lệ giữa chiều rộng và chiều cao của khuôn mặt
        face_ratio = w / h

        # Xác định loại khuôn mặt dựa trên tỉ lệ
        if 0.8 <= face_ratio <= 1.2:
            face_type = "Tròn"
        elif face_ratio < 0.8:
            face_type = "Dài"
        else:
            face_type = "Rộng"

        # Vẽ hình chữ nhật xung quanh khuôn mặt và hiển thị loại khuôn mặt
        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 0), 2)
        cv2.putText(image, face_type, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

    # Hiển thị ảnh với kết quả
    cv2.imshow('Image', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Đường dẫn đến ảnh cần nhận diện và phân loại
file_path = os.path.join(os.path.dirname(__file__), 'fave1.jpg')

# Gọi hàm nhận diện và phân loại khuôn mặt
detect_and_classify_faces(file_path)
