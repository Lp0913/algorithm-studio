# 🌿 Plant Disease Detection

A machine learning-powered web application that detects and classifies plant diseases from leaf images. Built with Streamlit and TensorFlow for an intuitive, real-time prediction experience.

## ✨ Features

- **Image Upload & Classification**: Upload plant leaf images (JPG, JPEG, PNG) for instant disease detection
- **Deep Learning Model**: Trained neural network for accurate disease classification
- **User-Friendly Interface**: Interactive Streamlit web app with side-by-side image and result display
- **Real-Time Predictions**: Fast inference with preprocessing and normalization
- **Production Ready**: Deployed model with error handling and user feedback

## 🛠️ Tech Stack

- **Framework**: Streamlit
- **Deep Learning**: TensorFlow & Keras
- **Image Processing**: Pillow, NumPy
- **Python**: 3.8+

## 📁 Project Structure

```
plant-disease-detection/
├── README.md                           # Project documentation
├── .gitignore                          # Git ignore file
├── app/
│   ├── main.py                         # Streamlit application
│   ├── class_indices.json              # Disease class mappings
│   └── trained_model/
│       ├── plant_disease_prediction_model.h5  # Pre-trained model
│       └── trained_model_link.txt      # Model download link
├── model_trainig_notebook/
│   └── plantdiseasedetection.ipynb     # Model training notebook
└── test_images/                        # Sample images for testing
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/darpanhh/plant-disease-detection.git
   cd plant-disease-detection
   ```

2. **Create and activate virtual environment** (recommended)
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install streamlit tensorflow pillow numpy
   ```

4. **Download the trained model**
   
   The model file (~547 MB) is stored on Google Drive:
   
   📥 **[Download Model](https://drive.google.com/file/d/1SLTUgtVYha3QACtapfcF7YayhunHa5Kl/view?usp=drive_link)**
   
   Extract to: `app/trained_model/plant_disease_prediction_model.h5`

### Running the Application

```bash
cd app
streamlit run main.py
```

The app will open in your browser at `http://localhost:8501`

## 📖 Usage

1. **Upload Image**: Click "Upload an image..." and select a plant leaf photo
2. **Preview**: The image will display in a 150×150 preview
3. **Classify**: Click the "Classify" button
4. **View Result**: The predicted disease class appears below

## 🧠 Model Details

| Property | Value |
|----------|-------|
| **Input Size** | 224×224 pixels (RGB) |
| **Architecture** | Deep Convolutional Neural Network |
| **Framework** | TensorFlow/Keras |
| **Training Notebook** | `model_trainig_notebook/plantdiseasedetection.ipynb` |
| **Output** | Disease classification |

## 🔧 Configuration

The application uses relative paths and requires no additional configuration:
- Model path: `app/trained_model/plant_disease_prediction_model.h5`
- Class indices: `app/class_indices.json`

## ⚠️ Troubleshooting

### Model File Not Found
```
Error: model_path does not exist
```
**Solution**: Download the model from Google Drive and place it in `app/trained_model/`

### Streamlit Command Not Found
```
streamlit : The term 'streamlit' is not recognized
```
**Solution**: Install streamlit
```bash
pip install streamlit
```

### Port Already in Use
```bash
# Run on different port
streamlit run main.py --server.port 8502
```

### Slow First Prediction
This is normal - TensorFlow initializes on first run. Subsequent predictions are faster.

## 📦 Dependencies

```
streamlit
tensorflow
pillow
numpy
```

Install all at once:
```bash
pip install -r requirements.txt
```

## 🎓 Training & Development

To retrain or modify the model, see `model_trainig_notebook/plantdiseasedetection.ipynb`

The notebook includes:
- Data loading and preprocessing
- Model architecture definition
- Training pipeline
- Evaluation metrics
- Model export

## 🌐 Deployment

To deploy this application:

**Streamlit Cloud** (Free)
```bash
git push origin main
# Then connect repo on https://streamlit.io/cloud
```

**Docker** (Optional)
```bash
docker build -t plant-disease-detection .
docker run -p 8501:8501 plant-disease-detection
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📧 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/darpanhh/plant-disease-detection/issues)
- **GitHub Discussions**: Ask questions and share ideas

## 🙏 Acknowledgments

- TensorFlow & Keras documentation
- Streamlit community
- Plant disease dataset contributors

---

**Last Updated**: May 2026  
**Status**: Active & Maintained
