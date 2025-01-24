package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/paymentintent"
)

func main() {
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	r := gin.Default()

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "up"})
	})

	// Payment endpoints
	r.POST("/api/payments", createPayment)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3004"
	}

	log.Printf("Payment service starting on port %s", port)
	log.Fatal(r.Run(":" + port))
}

func createPayment(c *gin.Context) {
	var req struct {
		Amount   int64  `json:"amount"`
		Currency string `json:"currency"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(req.Amount),
		Currency: stripe.String(req.Currency),
	}

	pi, err := paymentintent.New(params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"clientSecret": pi.ClientSecret})
}
