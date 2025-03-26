import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../Carousel";
import { numberToArray } from "../../utils/helpers";

describe("Carousel - public API (props)", () => {
  const Items = numberToArray(5).map(i => (
    <div className="test-child" key={i} data-testid={`test-child-${i}`}>
      {i}
    </div>
  ));

  it("renders without crashing", () => {
    render(<Carousel>{Items}</Carousel>);
  });

  it("renders children", () => {
    render(<Carousel>{Items}</Carousel>);
    const children = screen.getAllByTestId(/test-child-/);
    expect(children.length).toEqual(Items.length);
  });

  it("one child wont break on next", () => {
    render(<Carousel>{Items[0]}</Carousel>);
    const nextButton = document.querySelector("button.rec-arrow-right");
    fireEvent.click(nextButton);
  });

  it("renders with className in root", () => {
    const testClassName = "test-root";
    render(<Carousel className={testClassName}>{Items}</Carousel>);
    const carousel = document.querySelector(`.${testClassName}`);
    expect(carousel).toBeInTheDocument();
  });

  it("renders with style in root", () => {
    const styleToRender = { position: "fixed" };
    render(<Carousel style={styleToRender}>{Items}</Carousel>);
    const carousel = document.querySelector(".rec-carousel-wrapper");
    expect(carousel.style.position).toBe("fixed");
  });

  it("verticalMode", () => {
    render(<Carousel verticalMode>{Items}</Carousel>);
    const slider = document.querySelector(".rec-slider");
    expect(slider).toBeInTheDocument();
    const items = document.querySelectorAll(".rec-carousel-item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("isRTL", () => {
    render(<Carousel isRTL>{Items}</Carousel>);
    const carouselWrapper = document.querySelector(".rec-carousel-wrapper");
    expect(carouselWrapper).toBeInTheDocument();
    const items = document.querySelectorAll(".rec-carousel-item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("pagination", () => {
    render(<Carousel pagination>{Items}</Carousel>);
    const pagination = document.querySelector(".rec-pagination");
    expect(pagination).toBeInTheDocument();
  });

  it("renderPagination (renders custom pagination)", () => {
    const CustomPagination = () => (
      <div data-testid="custom-pagination">test</div>
    );
    const renderPagination = () => <CustomPagination />;
    render(<Carousel renderPagination={renderPagination}>{Items}</Carousel>);
    const customPagination = screen.getByTestId("custom-pagination");
    expect(customPagination).toBeInTheDocument();
  });

  it("wont break with outerSpacing", () => {
    render(<Carousel outerSpacing={100}>{Items}</Carousel>);
    const carousel = document.querySelector(".rec-carousel");
    expect(carousel).toBeInTheDocument();
  });
});

describe("Carousel - public CSS classnames", () => {
  const publicClasses = [
    "carousel-wrapper",
    "carousel",
    "slider-container",
    "slider",
    "carousel-item",
    "carousel-item-visible",
    "carousel-item-hidden",
    "carousel-item-prev",
    "carousel-item-next",
    "swipable",
    "dot",
    "dot_active",
    "pagination",
    "item-wrapper",
    "arrow"
  ];
  const prefix = "rec";
  const Items = numberToArray(5).map(i => (
    <div className="test-child" key={i} data-testid={`test-child-${i}`}>
      {i}
    </div>
  ));

  beforeEach(() => {
    render(
      <Carousel initialActiveIndex={2} itemsToShow={1}>
        {Items}
      </Carousel>
    );
  });

  publicClasses.forEach(className => {
    const withPrefix = `${prefix}-${className}`;
    it(`renders ${withPrefix}`, () => {
      const element = document.querySelector(`.${withPrefix}`);
      expect(element).toBeInTheDocument();
    });
  });
});
