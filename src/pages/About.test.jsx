import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './About';

// Wrapper component to provide router context
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('About Page', () => {
  beforeEach(() => {
    // Clear any previous renders
  });

  describe('Initial Render', () => {
    it('should render the main heading', () => {
      renderWithRouter(<About />);
      expect(screen.getByText('درباره ما')).toBeInTheDocument();
    });

    it('should render the welcome message', () => {
      renderWithRouter(<About />);
      expect(screen.getByText('خوش آمدید به فروشگاه آنلاین ما')).toBeInTheDocument();
    });

    it('should render the lead paragraph', () => {
      renderWithRouter(<About />);
      expect(screen.getByText(/ما متعهد به ارائه بهترین محصولات/)).toBeInTheDocument();
    });

    it('should render the benefits section', () => {
      renderWithRouter(<About />);
      expect(screen.getByText('مزایای ما')).toBeInTheDocument();
    });

    it('should render all benefit items', () => {
      renderWithRouter(<About />);
      expect(screen.getByText('کیفیت بالا')).toBeInTheDocument();
      expect(screen.getByText('قیمت مناسب')).toBeInTheDocument();
      expect(screen.getByText('ارسال سریع')).toBeInTheDocument();
      expect(screen.getByText('پشتیبانی 24/7')).toBeInTheDocument();
    });

    it('should render the statistics section', () => {
      renderWithRouter(<About />);
      expect(screen.getByText('آمار')).toBeInTheDocument();
      expect(screen.getByText('1000+')).toBeInTheDocument();
      expect(screen.getByText('مشتری راضی')).toBeInTheDocument();
    });

    it('should render the like button with initial count of 0', () => {
      renderWithRouter(<About />);
      const likeButton = screen.getByTestId('like-button');
      expect(likeButton).toBeInTheDocument();
      expect(likeButton).toHaveTextContent('👍 پسندیدم (0)');
    });

    it('should render the toggle details button', () => {
      renderWithRouter(<About />);
      const toggleButton = screen.getByTestId('toggle-details-button');
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveTextContent('نمایش جزئیات');
    });

    it('should not render details section initially', () => {
      renderWithRouter(<About />);
      expect(screen.queryByTestId('details-section')).not.toBeInTheDocument();
    });

    it('should render the copyright text', () => {
      renderWithRouter(<About />);
      expect(screen.getByText(/© 2024 فروشگاه آنلاین/)).toBeInTheDocument();
    });
  });

  describe('Interactive Features', () => {
    it('should increment like count when like button is clicked', () => {
      renderWithRouter(<About />);
      const likeButton = screen.getByTestId('like-button');
      
      // Initial state
      expect(likeButton).toHaveTextContent('👍 پسندیدم (0)');
      
      // Click the button
      fireEvent.click(likeButton);
      expect(likeButton).toHaveTextContent('👍 پسندیدم (1)');
      
      // Click again
      fireEvent.click(likeButton);
      expect(likeButton).toHaveTextContent('👍 پسندیدم (2)');
    });

    it('should show details section when toggle button is clicked', () => {
      renderWithRouter(<About />);
      const toggleButton = screen.getByTestId('toggle-details-button');
      
      // Initially details should be hidden
      expect(screen.queryByTestId('details-section')).not.toBeInTheDocument();
      expect(toggleButton).toHaveTextContent('نمایش جزئیات');
      
      // Click to show details
      fireEvent.click(toggleButton);
      expect(screen.getByTestId('details-section')).toBeInTheDocument();
      expect(toggleButton).toHaveTextContent('مخفی کردن جزئیات');
    });

    it('should hide details section when toggle button is clicked again', () => {
      renderWithRouter(<About />);
      const toggleButton = screen.getByTestId('toggle-details-button');
      
      // Show details first
      fireEvent.click(toggleButton);
      expect(screen.getByTestId('details-section')).toBeInTheDocument();
      
      // Hide details
      fireEvent.click(toggleButton);
      expect(screen.queryByTestId('details-section')).not.toBeInTheDocument();
      expect(toggleButton).toHaveTextContent('نمایش جزئیات');
    });

    it('should render details content when shown', () => {
      renderWithRouter(<About />);
      const toggleButton = screen.getByTestId('toggle-details-button');
      
      fireEvent.click(toggleButton);
      
      expect(screen.getByText('جزئیات بیشتر')).toBeInTheDocument();
      expect(screen.getByText(/این فروشگاه در سال 2024 تأسیس شده/)).toBeInTheDocument();
      expect(screen.getByText(/ما با تیمی متخصص و حرفه‌ای/)).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should render within a container', () => {
      renderWithRouter(<About />);
      const container = screen.getByText('درباره ما').closest('.container');
      expect(container).toBeInTheDocument();
    });

    it('should render within a card', () => {
      renderWithRouter(<About />);
      const card = screen.getByText('درباره ما').closest('.card');
      expect(card).toBeInTheDocument();
    });

    it('should have proper Bootstrap classes', () => {
      renderWithRouter(<About />);
      const card = screen.getByText('درباره ما').closest('.card');
      expect(card).toHaveClass('shadow');
    });

    it('should render badges for benefits', () => {
      renderWithRouter(<About />);
      const badges = screen.getAllByText('✓');
      expect(badges).toHaveLength(4);
      badges.forEach(badge => {
        expect(badge).toHaveClass('badge');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderWithRouter(<About />);
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });
      
      expect(h1).toHaveTextContent('درباره ما');
      expect(h2).toHaveTextContent('خوش آمدید به فروشگاه آنلاین ما');
      expect(h3s).toHaveLength(2); // "مزایای ما" and "آمار"
    });

    it('should have clickable buttons', () => {
      renderWithRouter(<About />);
      const likeButton = screen.getByTestId('like-button');
      const toggleButton = screen.getByTestId('toggle-details-button');
      
      expect(likeButton).toBeEnabled();
      expect(toggleButton).toBeEnabled();
    });
  });

  describe('State Management', () => {
    it('should maintain like count across multiple clicks', () => {
      renderWithRouter(<About />);
      const likeButton = screen.getByTestId('like-button');
      
      // Click multiple times
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);
      
      expect(likeButton).toHaveTextContent('👍 پسندیدم (3)');
    });

    it('should toggle details state correctly', () => {
      renderWithRouter(<About />);
      const toggleButton = screen.getByTestId('toggle-details-button');
      
      // Initial state
      expect(toggleButton).toHaveTextContent('نمایش جزئیات');
      
      // After first click
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent('مخفی کردن جزئیات');
      
      // After second click
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveTextContent('نمایش جزئیات');
    });
  });
}); 