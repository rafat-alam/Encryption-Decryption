
def distribute_list_continuously(lst, num_groups):
    """Distribute elements of lst into num_groups continuously."""
    if num_groups <= 0:
        raise ValueError("Number of groups must be positive.")

    # Calculate the size of each group
    group_size = len(lst) // num_groups
    remainder = len(lst) % num_groups

    groups = []
    start_index = 0

    for i in range(num_groups):
        # Determine the size of the current group
        # Add 1 to the first 'remainder' groups to distribute the remainder items
        current_group_size = group_size + (1 if i < remainder else 0)
        
        # Slice the list to get the current group
        group = lst[start_index:start_index + current_group_size]
        groups.append(group)
        
        # Update the starting index for the next group
        start_index += current_group_size

    return groups

# Example usage
original_list = ['C', '?', 'T', 'f', 'o', 'V', '4', 'W', 'S', 'n', 'w', '>', 'Y', '9', 'X', 'z', '&', '.', 'd', ')', 'x', '2', '$', 'L', '[', 'Z', '`', '<', 'E', 'e', '~', 'i', 'I', 'k', 'j', '=', ':', 'A', 'b', '_', 'z#x#x', 'Q', '5', 'g', '7', '1', 'l', '+', ']', '{', 'c', '(', 'D', 'r', 'N', '|', ';', '8', '@', 'v', '\\', 'G', '-', '"', 'H', 'O', '}', 'p', ',', 'y', "'", '6', '^', '*', 'B', 'K', 'P', 'R', 'M', 's', 'a', '%', '3', 'u', 'U', 't', 'q', '/', 'J', '!', 'h', 'F', 'm', '0', '#', 'z#y#y']
num_groups = 12
distributed_groups = distribute_list_continuously(original_list, num_groups)


def derangements(lst):
    """Generate all derangements of the list."""
    if len(lst) <= 1:
        return []

    # Helper function to generate derangements recursively
    def generate_derangements(current, remaining):
        if not remaining:
            # If nothing remains, we have a valid derangement
            results.append(current)
            return
        
        for i in range(len(remaining)):
            # Choose an element from remaining
            next_elem = remaining[i]
            # Check if the chosen element is not at its original position
            if next_elem != lst[len(current)]:
                # Create new lists for next recursion
                new_current = current + [next_elem]
                new_remaining = remaining[:i] + remaining[i+1:]
                # Recurse with updated lists
                generate_derangements(new_current, new_remaining)

    results = []
    generate_derangements([], lst)
    return results

all_derangements = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
for i in range(12):
    all_derangements[i] = derangements(distributed_groups[i])

b = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
def split_48_digit_integer():
    # Prompt for a 48-digit integer input
    input_integer = input("Enter 48 digits of secret code : ")

    # Store each 4-digit segment in a list
    segments = [input_integer[i:i+4] for i in range(0, 48, 4)]

    # Unpack the list into separate variables
    b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11] = segments

    # Print the stored values
    for index, value in enumerate(segments, start=1):
        b[index-1] = int(value)

# Example usage






def searchr(matrix, target):
    """Search for a target value in a 2D list (matrix).
    
    Returns the position (row, column) of the target if found,
    otherwise returns None.
    """
    for row_index in range(len(matrix)):
        for col_index in range(len(matrix[row_index])):
            if matrix[row_index][col_index] == target:
                return row_index
    return None
def searchc(matrix, target):
    """Search for a target value in a 2D list (matrix).
    
    Returns the position (row, column) of the target if found,
    otherwise returns None.
    """
    for row_index in range(len(matrix)):
        for col_index in range(len(matrix[row_index])):
            if matrix[row_index][col_index] == target:
                return col_index
    return None


def run(choice):
    if(choice==1):
        msg = input("Enter message : ")
        split_48_digit_integer()
        print("Secret Code : ", end="")
        k = "null"
        for i in range(len(msg)):
            if msg[i] == " ":
                k = "z#y#y"
                print(all_derangements[searchr(distributed_groups, k)][b[searchr(distributed_groups, k)]][searchc(distributed_groups, k)], end="")
            else:
                print(all_derangements[searchr(distributed_groups, msg[i])][b[searchr(distributed_groups, msg[i])]][searchc(distributed_groups, msg[i])], end="")
    elif(choice==2):
        def search(matrix, target):
            """Search for a target value in a 2D list (matrix).
            
            Returns the position (row, column) of the target if found,
            otherwise returns None.
            """
            for index in range(len(matrix)):
                if matrix[index] == target:
                    return index
            return None

        def printf(txt) :
            if(txt=="z#y#y") :
                print(" ", end="")
            else :
                print(txt, end="")
            
        def error() :
            print("\n\033[F\033[K", end='')
            print("You write the wrong code or message....")


        msg = input("Enter message : ")
        split_48_digit_integer()
        print("Secret Code : ", end="")
        k = "null"
        i=0
        j=len(msg)-1
        while i<=j:
            if((msg[i] == "z" and msg[i+1]== "#" and msg[i+3]=="#") and ((msg[i+2]=="y" or msg[i+2]=="x")and((msg[i+4]=="y" or msg[i+4]=="x")))):
                if(msg[i+2]=="y"):
                    try :
                        printf(distributed_groups[searchr(distributed_groups, "z#y#y")][search(all_derangements[searchr(distributed_groups, "z#y#y")][b[searchr(distributed_groups, msg[i])]],"z#y#y")])
                    except TypeError:
                        error()
                        break
                    i += 4
                else :
                    try :
                        printf(distributed_groups[searchr(distributed_groups, "z#x#x")][search(all_derangements[searchr(distributed_groups, "z#x#x")][b[searchr(distributed_groups, msg[i])]],"z#x#x")])
                    except TypeError:
                        error()
                        break
                    i+=4
            else:
                try :
                    printf(distributed_groups[searchr(distributed_groups, msg[i])][search(all_derangements[searchr(distributed_groups, msg[i])][b[searchr(distributed_groups, msg[i])]],msg[i])])
                except TypeError:
                    error()
                    break
            i+=1
    else:
        start()


def start():
    print("1. Encrypt")
    print("2. Decrypt")
    inp = int(input("Enter your choice number : "))
    choice = inp
    run(choice)


start()