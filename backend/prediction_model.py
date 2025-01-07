import numpy as np
from sklearn.linear_model import LinearRegression
import yfinance as yf

def predict_stock(stock_name):
    try:
        # Fetch stock data for the past 1 month
        stock_data = yf.download(stock_name, period="5y", interval="1d")
        
        # Handle cases where no data is returned
        if stock_data.empty:
            raise ValueError(f"No data found for ticker '{stock_name}'. Symbol may be incorrect or delisted.")

        # Prepare data for the model
        stock_data['Date'] = stock_data.index
        stock_data['Date'] = (stock_data['Date'] - stock_data['Date'].min()).dt.days
        dates = stock_data['Date'].values.reshape(-1, 1)
        prices = stock_data['Close'].values

        # Ensure there is enough data to train the model
        if len(dates) == 0 or len(prices) == 0:
            raise ValueError(f"Insufficient data for ticker '{stock_name}'.")

        # Train the model
        model = LinearRegression()
        model.fit(dates, prices)

        # Predict next day's price
        next_day = np.array([[dates[-1][0] + 1]])
        predicted_price = model.predict(next_day)[0]

        return {
    "stock_name": stock_name,
    "current_price": round(float(prices[-1]), 2),
    "predicted_price": round(float(predicted_price), 2),
}
    except Exception as e:
        return {"error": str(e)}
