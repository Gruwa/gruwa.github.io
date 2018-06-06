using System.Linq;
using CityInfo.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CityInfo.API.Controllers
{
    [Route("api/cities")]
    public class PointsOfInterestController : Controller
    {
        [HttpGet("{cityId}/pointsofinterest")]
        public IActionResult GetPointOfInterest(int cityId)
        {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(city.PointOfInterest);
        }

        [HttpGet("{cityId}/pointsofinterest/{id}")]
        public IActionResult GetPointOfInterest(int cityId, int id)
        {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
            
            if (city == null)
            {
                return NotFound();
            }

            var pointOfInterest = city.PointOfInterest.FirstOrDefault(p => p.Id == id);

            if (pointOfInterest == null)
            {
                return NotFound();
            }

            return Ok(pointOfInterest);
        }

        [HttpPost("{cityId}/pointsofinterest", Name = "GetPointOfInterest")]
        public IActionResult CreatePointOfInterestForCreationDto(int cityId,
            [FromBody] PointOfInterestForCreationDto pointOfInterest)
        {
            if (pointOfInterest == null)
            {
                return BadRequest();
            }

            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);

            if (city == null)
            {
                return NotFound();
            }

            var maxPoitOfInterestId = CitiesDataStore.Current.Cities.SelectMany(c => c.PointOfInterest).Max(p => p.Id);
            var finalPointOfInterest = new PointOfInterestDto()
            {
                Id = ++maxPoitOfInterestId,
                Name = pointOfInterest.Name,
                Description = pointOfInterest.Description
            };
            
            city.PointOfInterest.Add(finalPointOfInterest);

            return CreatedAtRoute("GetPointOfInterest", new { cityId = cityId, id = finalPointOfInterest.Id}, finalPointOfInterest);
        }
    }
}