namespace API.Interfaces
{
    public interface IDestinationRepository
    {
        Task<List<Destination>> SearchDestinationsAsync(List<string> keywords);
    }
}